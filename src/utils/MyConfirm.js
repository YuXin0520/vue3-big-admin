export const myConfirm = async (text = '是否确认删除', key = '删除') => {
  const confirmRes = await ElMessageBox.confirm(text, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((e) => e)
  if (confirmRes === 'cancel') {
    ElMessage(`取消了${key}`)
    return false
  }
  if (confirmRes === 'confirm') {
    ElMessage.success(`${key}成功`)
    return true
  }
}
