import ajax from '../utils/ajax'

export const gulpFile = async () => {
  await ajax.get('/gulp')
}