export type Item = {
  id: string,
  title: string,
  description: string,
  deadline: string,
  finished: boolean,
}

export type List = {
  id: string,
  title: string,
  items: Item[],
}
