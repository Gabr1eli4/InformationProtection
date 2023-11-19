interface TitleInterface {
  content: string
}

function Title({ content }: TitleInterface) {
  return <h1 className="title">{content}</h1>
}

export { Title }
