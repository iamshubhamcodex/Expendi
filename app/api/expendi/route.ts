export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  let data = [];
  for(let i = 1; i< 11; i++){
    data.push({"index": i})
  }
  return Response.json({ expendi: data })
}