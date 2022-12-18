const server = require("./src/app.js");
const {
  conn,
  UserRol,
  User,
  Supplier,
  Service,
  Category,
  Detail,
  Review,
  Op,
} = require("./src/db.js");
const rols = require("./Datos/UserRols.json");
const users = require("./Datos/Users.json");
const suppliers = require("./Datos/Suppliers.json");
const services = require("./Datos/Services.json");
const categories = require("./Datos/Categories.json");
const details = require("./Datos/Details.json");

const PORT = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(async () => {
    let supplietUUID = [];
    //Details
    details.forEach(async (detail) => await Detail.create(detail));
    //Category
    categories.forEach(async (category) => await Category.create(category));
    //Rols
    rols.forEach(async (rol) => await UserRol.create(rol));
    //Users
    users.forEach(async (user) => {
      let { userName } = user;
      let userBD = await User.create(user);

      const roles = {
        Nadia: "Admin",
        Kevin: "Supplier",
        Sandra: "SuperAdmin",
      };

      await userBD.setUserRol(roles[userName] ?? "User");

      await userBD.setDetail(1);
    });
    //ProveedoresLimpieza S.A.
    suppliers.forEach(async (supplier) => {
      let suppliersBD = await Supplier.create(supplier);
      await suppliersBD.setDetail(2);
      supplietUUID.push(suppliersBD.dataValues.id);
    });
    //Services
    servCat = {
      Reparación: 1,
      Limpieza: 2,
      Lavado: 3,
      Planchado: 4,
      Desinfección: 6,
      Fumigación: 7,
      Plomería: 8,
      Termotanques: 8,
      Electricidad: 9,
      Aires: 9,
      Pintura: 10,
      Construcción: 11,
      Aberturas: 11,
      Durlock: 11,
      Herrería: 12,
      Carpintería: 13,
    };

    services.forEach(async (service) => {
      let serviceBD = await Service.create(service);
      let servTypeWords = service.serviceType.split(" ");
      let description = service.description;

      if (servCat.hasOwnProperty(servTypeWords[0])) {
        await serviceBD.setCategory(servCat[servTypeWords[0]]);
      } else if (
        ["espacios verdes", "árboles", "jardines"].some((palabra) =>
          description.includes(palabra)
        )
      ) {
        await serviceBD.setCategory(5);
      } else {
        await serviceBD.setCategory(14);
      }

      /*
const ids = await Supplier.findAll({
  where: {
      description : {
          [Op.iLike]: `%${service.serviceType}%` //case insensitive, busca aunque no sea un matcheo exacto en cualquier lugar del texto.
      }                           //EJEM: si se busca "lim" trae todos los services que lleven lim (Limpieza de techos, Limpieza de cloacas, etc)
  }});
  console.log(ids)
  console.log(service.serviceType)
  for(let i=0;i<ids.length;i++){
    await serviceBD.addSupplier(ids[i]);
  }
*/

      if (servTypeWords === "Techos") {
        await serviceBD.addSupplier(supplietUUID[3]);
      } else if (servTypeWords[2] === "Paredes") {
        await serviceBD.addSupplier(supplietUUID[1]);
      } else if (
        servTypeWords[2] === "Hogares" ||
        servTypeWords[2] === "Hospitales"
      ) {
        await serviceBD.addSupplier(supplietUUID[0]);
      } else {
        await serviceBD.addSupplier(supplietUUID[2]);
      }

      // const userReviewer = await User.findOne();

      // for (let i = 0; i < 5; i++) {
      //   let newReview = await Review.create({
      //     comment: "something",
      //     rating: parseFloat((Math.random() * 5).toFixed(1)),
      //   });
      //   await newReview.setUser(userReviewer);
      //   await serviceBD.addReview(newReview);
      // }
    });
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server listening at " + PORT);
    });
  });
