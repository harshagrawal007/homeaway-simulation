const initialStore = {
    authFlag: false,
    owneremail: "",
    email: "",
    password: "",
    type: "",
    firstname: "",
    lastname: "",
    about: "",
    gender: "",
    phone: "",
    company: "",
    languages: "",
    location: "",
    emailCheck: false,
    passwordCheck: false,
    traveller: {},


    Country: "",
    Address: "",
    Unit: "",
    City: "",
    State: "",
    Postal: "",
    Headline: "",
    Pdescription: "",
    Ptype: "",
    Bedrooms: "",
    Accomodates: "",
    Bathrooms: "",
    Minimumstay: "",
    Baseprice: "",
    Pernight: "",
    photos: ""

}

const reducer = (state = initialStore, action) => {
    //TravellerLogin
    if (action.type === "TravelerLogin" && action.statusCode === 200) {
        localStorage.setItem('type', "traveller");
        return {
            ...state,
            email: state.email.concat(action.payload.email),

            type: state.type.concat(action.payload.type),
            authFlag: action.payload.authFlag

        }

    }
    if (action.type === "TravelerLogin" && action.status === 400) {
        return {
            ...state,
            authFlag: action.payload.authFlag
        }
    }

    //TravellerSignup
    if (action.type === "TravellerUpdate" && action.statusCode === 200) {
        return {
            ...state,
            authFlag: action.payload.authFlag
        }
    }
    if (action.type === "TravellerUpdate" && action.status === 400) {
        return {
            ...state,
            authFlag: action.payload.authFlag
        }
    }
    //TravellerSignup

    if (action.type === "TravellerSignup" && action.statusCode === 200) {
        return {
            ...state,
                
        }
    }
    if (action.type === "TravellerSignup" && action.status === 400) {
        return {
            ...state,

        }
    }

    //OwnerLogin
    if (action.type === "OwnerLogin" && action.statusCode === 200) {
        localStorage.setItem('type', "owner");

        return {
            ...state,
            email: state.email.concat(action.payload.email),
            owneremail: state.owneremail.concat(action.payload.email),
            type: state.type.concat(action.payload.type),
            authFlag: action.payload.authFlag
        }
    }
    if (action.type === "OwnerLogin" && action.status === 400) {
        return {
            ...state,
            authFlag: action.payload.authFlag
        }
    }

    //homeseacrh
    if (action.type === "Home" && action.statusCode === 200) {
        return {
            ...state,
            // email : state.email.concat(action.payload.email),
            // authFlag : action.payload.authFlag
        }
    }
    if (action.type === "Home" && action.status === 400) {
        return {
            ...state,
            // authFlag : action.payload.authFlag 
        }
    }

    //Addproperty
    if (action.type === "AddProperty" && action.statusCode === 200) {
        return {
            ...state,
            // email : state.email.concat(action.payload.email),
            // authFlag : action.payload.authFlag
        }
    }
    if (action.type === "AddProperty" && action.status === 400) {
        return {
            ...state,
            // authFlag : action.payload.authFlag 
        }
    }




    return state;
}
export default reducer;