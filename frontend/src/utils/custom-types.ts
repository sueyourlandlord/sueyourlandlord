namespace CustomTypes {
    export type userSelection = {
        mandatory: {
            size: number | null;
        };
        buildingDetails: {
            age:
                | 'before 1930'
                | '1930 - 1940'
                | '1940 - 1950'
                | '1950 - 1960'
                | '1960 - 1970'
                | '1970 - 1980'
                | '1980 - 1990'
                | '1990 - 2000'
                | '2000 - 2010'
                | 'after 2010';
            buildingHeight: '<= 7 stories' | '> 7 stories';
            ceilingHeight: '<= 2.7m' | '> 2.7m';
            rearBuilding: 'rear building' | 'next to street';
            smartStuff:
                | 'video intercom or electric shutters'
                | 'no/only other smart stuff';
            gallery: 'gallery' | 'no gallery';
        };
        bathroom: {
            bathType:
                | 'normal bath'
                | 'luxury bath'
                | 'luxury bath + luxury bathtub';
            bathroomSize: '<= 6m2' | '> 6m2';
            towelRadiator: 'exists' | 'missing';
            lastRenovation: 'before 2009' | 'after 2009 (including)';
        };
        flooring: {
            quality: '< 50% HQ' | '50 - 99% HQ' | '100% HQ';
            lastRenovation: 'before 2013' | 'after 2013 (including)';
        };
        kitchen: {
            location: 'kitchen in dedicated room' | 'open kitchen';
            ownership: 'landlord owns it' | 'you own it';
            hasCookingPlate: 'yes' | 'no';
            hasFridge: 'yes' | 'no';
            hasDishwasher: 'yes' | 'no';
        };
        heating: {
            heatingType: 'underfloor heating' | 'radiator heating';
            fullWarmWaterAccess: 'yes' | 'no';
            fullHeatingAccess: 'yes' | 'no';
            temperatureIsAdjustable: 'yes' | 'no';
        };
        balcony: {
            balconyType: 'no balcony' | '< 10m2' | '>= 10m2';
            direction: 'points towards S/SW/SE' | 'other';
        };
    };

    export type CategoryLabel =
        | 'building details'
        | 'bathroom'
        | 'flooring'
        | 'kitchen'
        | 'heating'
        | 'balcony';
}

export default CustomTypes;
