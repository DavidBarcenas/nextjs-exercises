interface Props {
  params: {
    id: string
  }
}

export default function Pokemon({ params }: Props) {
  console.log(params)
  return (
    <div>
      <h1>Pokemon</h1>
    </div>
  )
}