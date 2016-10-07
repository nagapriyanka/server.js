module.exports = function(sequelize,DataTypes)
{
	return sequelize.define('users',{
		name :{
			type :DataTypes.STRING,
			allowNull:false,
		},
		surname :{
			type :DataTypes.STRING,
			allowNull:false,
		},
		email:{
			type :DataTypes.STRING,
			allowNull:false,

			validate:{
				isEmail : true
			}
		},
		password :{
			type :DataTypes.VIRTUAL,
			allowNull:false,
			validate :{
				len :[8,16]
				is:["^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}"]
			}
		},
		mobileNumber :{
			type :DataTypes.INTEGER,
			allowNull:false,
			validate :{
				len :[10]
			}
		},
		zipcode :{
			type :DataTypes.INTEGER,
			allowNull:false,
			validate :{
				len :[6]
			}
		},
		city:{
			type :DataTypes.STRING,
			allowNull:true,
		},
		state :{
			type :DataTypes.STRING,
			allowNull:true,
		},
		country :{
			type :DataTypes.STRING,
			allowNull:true,
		}
	});
}