const User = require('../models/user');


//get all users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            //Retornar los usuarios en un json
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}
//get single user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    //Find user by Primary Key
    User.findByPk(userId)
        .then(user => {
            if (!user) {//Si no se encuentra
                return res.status(404).json({ message: 'User not found!' });
            }
            //Caso contrario, se retorna el usuario
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

//create user con POST Request
exports.createUser = (req, res, next) => {
    //Se necesita un body
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name : name,
        email : email
    })
    .then(result => {
        console.log('Created User');
        res.status(201).json({//Se ha creado correctamente
          message: 'User created successfully!',
          user: result
        });
      })
      .catch(err => {
        console.log(err);
      }); 
}

//Update user
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        user.name = updatedName;
        user.email = updatedEmail;
        return user.save();
      })
      .then(result => {
        res.status(200).json({message: 'User updated!', user: result});
      })
      .catch(err => console.log(err));
  }

  //delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        return User.destroy({
          where: {
            id: userId
          }
        });
      })
      .then(result => {
        res.status(200).json({ message: 'User deleted!' });
      })
      .catch(err => console.log(err));
  }
