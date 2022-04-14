const randomFns = () => { // 生成6位随机数
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += parseInt(Math.random() * 10)
  }

  return code
}
const currentDate = new Date().getTime();
const EMAIL = 'xxx'; // 这里是接收邮件的邮箱，我这里写死，可从req中获取
let code = randomFns();
code = `${code}@${currentDate}`;
console.log(code)




