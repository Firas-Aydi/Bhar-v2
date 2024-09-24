const axios = require('axios')
module.exports = {
  Add: async (req, res) => {
    const url = 'https://developers.flouci.com/api/generate_payment'
    const payload = {
      app_token: 'b1fc4f1b-fde9-4001-ade3-6ea6f90bcebc',
      app_secret: '6fc600e8-47fc-4392-bf93-769a9402154d',
      amount: req.body.amount,
      accept_card: 'true',
      session_timeout_secs: 1200,
      success_link: 'https://localhost:3000/success',
      fail_link: 'https://localhost:3000/fail',
      developer_tracking_id: 'a169d1f7-0716-40dc-aee0-cc52e86c76fc'
    }
    await axios
      .post(url, payload)
      .then(result => {
        res.send(result.data)
      })
      .catch(err => console.error(err))
  },
  Verify: async (req, res) => {
    const payment_id = req.params.id
    await axios
      .get(`https://developers.flouci.com/api/verify_payment/${payment_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'apppublic': 'b1fc4f1b-fde9-4001-ade3-6ea6f90bcebc',
          'appsecret': '6fc600e8-47fc-4392-bf93-769a9402154d'
        }
      })
      .then(result => {
        res.send(result.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}
