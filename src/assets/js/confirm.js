import {
  MessageBox
} from 'element-ui'


export default (msg, title, type = "warning") => {
  return MessageBox.confirm(msg, title, {
    type,
    customClass: "myConfirm"
  })
}
