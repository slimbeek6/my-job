const user = require("./user");

var statusopts = ["Applied", "Recruiter Responded", "Interview Scheduled", "Interview Completed", "Offer Made", "Rejection"];

function validateEmail(value) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

module.exports = function(sequelize, DataTypes) {
    var Application = sequelize.define("Application", {
        company: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1]}
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1]}
        },
        jobsitelink: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
                isUrl: true 
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "Applied",
            validate: {
                len: [1],
                // isIn: [statusopts] // This is causing problems. -JK
            }
        },
        recruiterName: {
            type: DataTypes.STRING,
            allowNull: true,
            default: "N/A"
        },
        recruiterContact: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                if (value !== "null" && !validateEmail(value)) {
                    throw new Error("Must be blank or a valid email address");
                    }
                }
            }
        }    
    });

    Application.associate = function(models) {
        Application.hasMany(models.Note, {
            onDelete: "cascade"
        });
    };
    
    
    Application.associate = function(models) {
        Application.belongsTo(models.User, {
            foreignKey : {
                allowNull: false
            }
        });
    };

    return Application;
};