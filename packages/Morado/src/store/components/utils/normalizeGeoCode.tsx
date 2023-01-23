

type AddressComponent = {
    "long_name": string
    "short_name": string
    "types": string[]
}

type GeoCoords = {
    location: {
        lng: number
        lat: number
    }
}

interface Res {
    "addressResult": {
        "address_components": AddressComponent[]
        geometry: GeoCoords
    }
}

class Location {
    postalCode: string;
    lng: number
    lat: number
    department: string
    city: string
    constructor(props: Res) {
        this.postalCode = this._getPostalCode(props.addressResult.address_components)
        this.department = this._getDepartment(props.addressResult.address_components)
        this.city = this._getCity(props.addressResult.address_components)
        this.lng = props.addressResult.geometry.location.lng
        this.lat = props.addressResult.geometry.location.lat
    }
    _getValFromAddressComponent = (name: string, address_component: AddressComponent[]) => {
        const element = address_component.find((pred) => {
            const type = pred.types.findIndex((type) => type === name)
            if (type !== -1) {
                return true
            }
            return false
        })
        if (element) {
            return element.long_name
        }
        return null
    }
    _getPostalCode = (address_component: AddressComponent[]) => {
        let postalCode = ""
        const element = this._getValFromAddressComponent("postal_code", address_component)
        if (element) {
            postalCode = element
        }
        return postalCode
    }
    _getDepartment = (address_component: AddressComponent[]) => {
        let department = ""
        const element = this._getValFromAddressComponent("administrative_area_level_1", address_component)
        if (element) {
            department = element
        }
        return department
    }
    _getCity = (address_component: AddressComponent[])=> {
        let city = ""
        const element = this._getValFromAddressComponent("locality", address_component)
        if (element) {
            city = element
        }
        return city
    }
}

const NormalizeGeoCode = (results: any[]) => {
    return results.map(result => {
        const location = new Location({
            addressResult: result
        })
        console.log("Parser Res:", location)
        return {
            formatted_address: result.formatted_address,
            lat: location.lat,
            lng: location.lng,
            postalCode: location.postalCode,
            department: location.department,
            city: location.city
        }
    });
};

export default NormalizeGeoCode;