import ajax from '../utils/request'

export const gulpFile = async () => {
  await ajax.get('/gulp')
}