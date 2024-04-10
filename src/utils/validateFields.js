const peopleModel = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: ''
};

module.exports.validateFields = (data) => {
    for (const key in peopleModel) {
        if (!Object.hasOwnProperty.call(data, key)) {
            throw "Attribute " + key + " is required";
        }
    }
}