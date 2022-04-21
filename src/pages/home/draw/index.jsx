import React, { useState } from "react";
import {
  AtButton,
  AtForm,
  AtInput
} from "taro-ui";
const Draw = (props) => {
  const [value, setValue] = useState('')
  const handleChange = (e) =>{
    console.log(e);
    setValue(()=>{
      return e
    })
  }
  const onSubmit = (event) => {
      
  }
  const onReset = () => {
    setValue('')
  }
  return (
    <>
    <AtForm>
        <AtInput 
          title='文本' 
          type='text' 
          placeholder='单行文本' 
          value={value} 
          onChange={(e)=>handleChange(e)} 
        />
        <AtButton formType='submit'>提交</AtButton>
        <AtButton onClick={()=>onReset()}>重置</AtButton>
      </AtForm>
      {/* <div className={style.container}>
        <ButtomMenu menu={menu} />
      </div> */}
    </>

  )
}
// const Part = connect((state) => {//mapStateToProps
//   //state为当前redux 执行getState()后获得的对象
//   console.log(state);
//   return {
//     state
//   }
// }, (dispatch) => {
//   return {
//     // handleclick: (list) => dispatch(showEnActin(list))
//   }
// })(Vote)

export default Draw