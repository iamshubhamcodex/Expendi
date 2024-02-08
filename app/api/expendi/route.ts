import dbConnect from "@/lib/dbConnect";
import Expendi from "@/model/Expendi";

export const dynamic = "force-dynamic"; // defaults to auto

dbConnect();
function parseGetParameters(url: string) {
  if (url.indexOf("?") === -1) return {};
  let params = url.split("?")[1].split("&");

  let body: Record<string, string> = {};

  params.forEach((param) => {
    let [key, value] = param.split("=");
    if (key) body[key] = value;
  });
  return body;
}
function parseDate(date: string): string {
  return new Date(decodeURIComponent(date)).toISOString();
}
export async function GET(request: Request) {
  const body = parseGetParameters(request.url);

  if (body.startDate || body.endDate) {
    const startDate =
      parseDate(body.startDate).split("T")[0] + "T00:00:00.000Z";
    const endDate = parseDate(body.endDate).split("T")[0] + "T23:59:59.000Z";

    const expendis = await Expendi.find(
      {
        date: { $gte: startDate, $lte: endDate },
      },
      ["-__v"],
      { sort: { date: -1 } }
    );
    return Response.json({ expendis });
  }

  const expendis = await Expendi.find({}, ["-__v"], { sort: { date: -1 } });
  return Response.json({ expendis });
}

export async function POST(request: Request) {
  const body = await request.json();

  let expendi = new Expendi(body);
  let savedExpendi = await expendi.save();
  return Response.json({ expendi: savedExpendi, data: body });
}

export async function DELETE(request: Request) {
  const body = await request.json();

  let expendi = await Expendi.findByIdAndDelete(body.id);
  return Response.json({ data: expendi });
}
