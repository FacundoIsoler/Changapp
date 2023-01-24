const { Receipt, Contract, Supplier, Service} = require('../db');

async function getData (receiptId) {

  const search = await Contract.findAll({
    include: [
      {model: Receipt},
      {model: Supplier}  
    ],
    where:{
      ReceiptId: receiptId
    },
    raw: true,
    nested: true
  })

  let contractsId = [];
  search.forEach( contract => contractsId.push(contract.SupplierServiceId))

  console.log(contractsId)

  const changeStatus = search.map( async element => {

    await Contract.update({
      status: "PROCESADO"
    },{
      where:{
        id: element.id
      }
    })
  })
  await Promise.all(changeStatus);

  const services = await Service.findAll({
    include: {
      model: Supplier
    },
    raw:true,
    nested: true
  });

  let selectedServices = []

  contractsId.forEach( contract => {
     services.forEach( service => {
      console.log(contract, "CONTRACT")
      console.log(service["Suppliers.SupplierService.id"], "SERVICE")
      if(service["Suppliers.SupplierService.id"] === contract){
        selectedServices.push({ service: service, contract: contract})
      }
    })
  })

  return selectedServices;

}

module.exports = {
  getData
}