import {
  Message
} from 'element-ui'


export default (msg, type = "error") => {
  Message({
    type,
    message: msg,
    customClass: "myMsg"
  })
}
