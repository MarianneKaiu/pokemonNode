const validTypes = [
    "Plante",
    "Poison",
    "Feu",
    "Eau",
    "Insecte",
    "Vol",
    "Normal",
    "Electrik",
    "Fée",
];
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Pokemon",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: "Les points de vie sont une propriétée requise.",
                    },
                    notNull: {
                        msg: "Les points de vie sont une propriétée requise.",
                    },
                },
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
                    },
                    notNull: {
                        msg: "Les points de vie sont une propriétée requise.",
                    },
                    max: {
                        args: [999],
                        msg: "Les points de vie ne peuvent être supérieurs à 999",
                    },
                    min: {
                        args: [0],
                        msg: "Les points de vie ne peuvent être inferieurs à 0",
                    },
                },
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
                    },
                    notNull: {
                        msg: "Les points de vie sont une propriétée requise.",
                    },
                    max: {
                        args: [99],
                        msg: "Les points de dégats ne peuvent être supérieurs à 99",
                    },
                    min: {
                        args: [0],
                        msg: "Les points de dégat ne peuvent être inferieurs à 0",
                    },
                },
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: {
                        msg: "Veuillez entrer une URL.",
                    },
                    notNull: {
                        msg: "L'image est une propriétée requise.",
                    },
                },
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue("types").split(",");
                },
                set(types) {
                    this.setDataValue("types", types.join());
                },
                validate: {
                    isTypesValid(value) {
                        if (!value) {
                            throw new Error("Un pokémon doit avoir un type.");
                        }
                        if (value.split(",").length > 3) {
                            throw new Error(
                                "Un pokémon ne peut avoir plus de trois types."
                            );
                        }
                        value.split(",").forEach((types) => {
                            if (!validTypes.includes(types)) {
                                throw new Error(
                                    `Le type du pokémon doit appartenir à la liste suivante : ${validTypes}`
                                );
                            }
                        });
                    },
                },
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
