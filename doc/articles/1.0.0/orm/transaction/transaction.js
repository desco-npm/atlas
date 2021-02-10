module.exports = {
  lang: 'js',
  content: `
function myOperation () {
  try {
    return Atlas.transaction(async t => {
      const user = await User.create({
        firstName: 'Abraham',
        lastName: 'Lincoln',
      }, { transaction: t })
  
      await user.setShooter({
        firstName: 'John',
        lastName: 'Boothe',
      }, { transaction: t })
  
      return user
    })
  } catch (error) {
    console.log(error)

    return error
  }
}
  `,
}