export type MapViewProps = {
    center: number[],
    examples: Example[]
}

export type Example = {
    location: number[],
    org_rent: number,
    new_rent: number
}

export type MapProps = {
    curLoc: number[],
    num_extras: number
}