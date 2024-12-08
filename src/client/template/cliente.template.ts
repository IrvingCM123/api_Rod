export function cliente_template(
    Fecha: string,
    Cliente: any
) {
    const html_boletos = `
     <!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        .container {
            max-width: 80%;
            margin: 5% auto;
            padding: 2%;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            color: #333;
            font-size: 150%;
            margin-bottom: 20px;
        }

        .info {
            margin-bottom: 20px;
            color: #666;
            font-size: 100%;
        }

        .info p {
            margin: 2.5% 0;
        }

        .info p span {
            margin: 1.5%;
            font-weight: bold;
        }

        .iterar {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .download-link {
            text-align: center;
        }

        .image-container {
            text-align: center;
            margin-top: 20px;
        }

        .apple img {
            max-height: 45px;
        }

        img {
            height: auto;
            max-height: 50%;
            width: 80%;
            border-radius: 10px;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="image-container">
           
        </div>

        <div class="header">
            <h2>Solicitud de ticket de compra</h2>
        </div>

        <div class="info">

            <p>Fecha de solicitud: ${Fecha}</p>

            <p>Estimado Cliente ${Cliente}, por medio de este correo electrónico se le proporciona la información relacionada con su compra solicitada </p>

        </div>

        <div class="info">
            <p> Si tiene alguna duda, o aclaración, contactenos </p>
        </div>
    </div>
</body>

</html>
  `;
    return html_boletos;
}
