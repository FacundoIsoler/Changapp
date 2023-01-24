
function successMessage(email, order){

  const serviceContract = order.map( element => {
    return `<div style="border-radius:15px; padding:1%; background-color: #0084FF; width: max-content">
            <li><b>Servicio:</b> ${element.service.serviceType}</li>
            <ul>
              <li><b>N° de contrato:</b> ${element.contract}</li>
              <li>Proveedor:</b> ${element.service["Suppliers.name"]}</li>
            </ul>
            </div>`
  })

  return {
    from: '"ChangApp" <lmarcanox00x@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Se ha realizado su contratación!", // Subject line
        //text: "Hello world?", // plain text body
        html: `<div style="border: 1px solid #000; width: max-content">
                  <div style="padding:1%; color:#000; background-color: #000; width:100%">
                    <b style="color:#FFF">Estimado usuario</b>
                    <p style="color:#FFF">El pedido de la contratación de los servicios:</p>
                  </div>
                  <ul>
                    ${serviceContract}
                  </ul>
                  <div style="padding: 1%">
                    <span>Se ha realizado <b style="color:#50AD07; font-weight:bolder">exitosamente!</b></span>
                    <p>Recuerde puntuar su servicio una vez finalizado.</p>
                  </div>
                </div>`
  }
}

function failureMessage(email){
  return {
    from: '"ChangApp" <lmarcanox00x@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "No se ha podido realizar la contratación", // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>Estimado usuario</b>
        <p>El pedido de la contratación del servicio "x" con la identificación "y" no ha podido
        ser realizado. Por favor, intente nuevamente realizar su pedido. Disculpe las molestias.</p>`
  }
}

module.exports = {
  successMessage,
  failureMessage
}