import React from 'react'
import {useState} from 'react'


import {
    Flex, 
    Button,
    Center,
    Spacer,
    ButtonGroup,
    Box,
    Heading,
    Select,
    Stack, HStack, VStack ,Input,Divider
  } from '@chakra-ui/react'
import StripeCheckout from "react-stripe-checkout";




function Create() {

    const [value, setValue] = React.useState()
    const [inputList, setinputList] = useState([{firstName:"", LastName:""}]);
    const [Total,setTotal] = useState("0")
    const [Tress,setTrees] = useState("0")

    let items = {
        PETbottles: 13.1,
        Singleusebag : 2.9,
        singleusewrappers : 5.5,
        plasticcontainers : 5.5,
        cottonswabs : 0.4,
        Takeawayplasticcup : 7.3,
        PlasticStraws : 0.2,
        Singleusecutlery : 1.5,
        Plasticplates : 8.8,
        Milkcontainer : 10.18,
        PlasticbinLiner : 11.49,
        Juicecartons : 6.48

      }


  const handleToken = (token) => {
    fetch("https://stripe.binaryscript.com/payment/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, Tress }),
    })
    .then(res => res.json())
    .then(_ => {
      window.alert("Transaction Successful.");
    }).catch(_ => window.alert("Transaction Failed."))
  }

    const add =(day,item)=>{
        const number = day * item
        return number
    }

    const sum = (_numbers) => {
        const totalamount = _numbers.reduce((a, b) => a + b, 0)
        return totalamount
        }

        const calculate =()=>{
            
            let total =[]
            for (let index = 0; index < inputList.length; index++) {
               

                const totalitem = add(inputList[index].firstName,inputList[index].LastName)
               total.push(totalitem)
               console.log(totalitem)

                
            }
            

          const number = sum(total)
          console.log(number)
          setTotal(number)
          setTrees( Math.round(number/ 27.77))
          console.log(Total)
            

        }
       



    const handleinputchange= (e , index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list)
        console.log(inputList.firstName)
        console.log(inputList.LastName)
      }
     
      const handleremove= (index)=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
      }
    
      const handleaddclick=()=>{ 
        setinputList([...inputList, { firstName:'', LastName:''}]);
      }


  return (
    <>
    <Box>
     <Center><Heading as='h1' size='4xl' fontSize='125px' noOfLines={1}>
    OCEAN AND US 
  </Heading>
  </Center>
  <Center><Heading as='h1' size='4xl' fontSize='50px' noOfLines={1}>
plastic Footprint Calculator
  </Heading>
  </Center>
 
  <Spacer/>
  <Spacer/>
    

  { inputList.map( (x,i)=> ( 
      <Center>
      <HStack spacing='50px'direction={'column'}>
   
  


   <Select name='firstName' placeholder='Select item'  onChange={(e) =>handleinputchange(e,i)}value= {inputList.firstName}  width='150px' maxHeight='10'  gap ="">
    
   
  <option value={items.PETbottles} >PET bottles</option>
  <option value={items.Singleusebag}>Single use bag</option>
  <option value={items.singleusewrappers}>single use wrappers</option>
  <option value={items.plasticcontainers}>plastic containers</option>
  <option value={items.cottonswabs}>cotton swabs</option>
  <option value={items.Takeawayplasticcup}>Takeawayplasticcup</option>
  <option value={items.Singleusecutlery}>Single use cutlery</option>
  <option value={items.Plasticplates}>Plastic plates</option>
  <option value={items.Milkcontainer}>Milk container</option>
  <option value={items.PlasticbinLiner}>Plastic bin Liner</option>
  <option value={items.Juicecartons}>Juice cartons</option>
  <option value={items.PlasticStraws}>Plastic Straws</option>
</Select>


<Input name='LastName' placeholder=' amount you use' size='md' width='180px' value={inputList.LastName} onChange={(e) =>handleinputchange(e,i)} />
<Spacer/>
<Button colorScheme='blue' onClick={handleremove} >Remove</Button>
 








</HStack>
</Center>
))}




<Center>

<Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
            <Spacer/>
            <HStack spacing='24px'>
          <Button  onClick={handleaddclick} colorScheme='blue'>Add</Button>
         
          <Button  onClick={calculate} colorScheme='blue'>Calculate</Button>
          </HStack>
        </Box>

       



</Center>
</Box>

<Center>
<Heading as='h1' size='xl' fontSize='50px' noOfLines={1}>
Your Yearly Plastic Footprint is : {Total} kg

  </Heading>
  
  </Center>

  <Center><Heading as='h1' size='xl' fontSize='50px' noOfLines={1}>
Trees Need to be Planted : {Math.round(Total/ 28)} trees

  </Heading></Center>

  <StripeCheckout
          stripeKey={"pk_test_51LkAtbSEbhdFgXVIh8G47iU6osdYIwCa00bz3Cc4Vnhl795sd7UkLWE2XWI6gV7CZ2JP4L3YMBDoXPCnfGMejggP00H8Z9dM4M"}
          token={handleToken}
          name=""
          panelLabel={`Donate`}
          currency="USD"
          amount={Tress* 100}
      >
         
      </StripeCheckout>






</>

  )
}

export default Create
