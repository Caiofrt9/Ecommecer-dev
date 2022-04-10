import React,{useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AdressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping adress', 'Payment details']

const Checkout = ({ cart }) => {

  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()

  useEffect(() => {
    const generateToken = async () => {
      try{
        const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})

        setCheckoutToken(token)
      } catch (error) {

      }
    }

    generateToken()
  },[cart])

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 )
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 )

  const next = (data) => {
    setShippingData(data)

    nextStep()
  }

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  )

  const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}/>
  return (
    <>
      <div className={classes.toolbar}/>
      <main classeName={classes.layout}>
        <Paper className={classes.paper} sm={3}>
          <Typography variant ='h5' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

            {activeStep === steps.lenght ? <Confirmation/> : checkoutToken && <Form/>}

        </Paper>
      </main>
    </>
    )
}

export default Checkout