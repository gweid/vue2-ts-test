export interface IStateInit {
  userInfo: IUserInfo
}

export interface IUserInfo {
  name: string
  age: number
  sex?: number
  token: string
  hobby?: string[]
}