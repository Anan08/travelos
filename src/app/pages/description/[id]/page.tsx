
export default function Page({ params }: { params: { types: string } }) {
  return (
  <>
    <div> <h1> Type: {params.types} </h1></div>
  </>
  )
}