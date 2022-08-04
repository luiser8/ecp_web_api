export const checkNotRepitMaterial = (...values) => {
    const { materialId, materials } = values[0];

    let error = false;

    const check = materials.filter((m => m.material.toString() === materialId));

    if(check.length !== 0){
        check.forEach(_ => {
            error = true;
        });
    }

    return { error };
}

export const checkNotRepitPackingKits = (...values) => {
    const { packingKitId, packingKits } = values[0];

    let error = false;

    const check = packingKits.filter((pk => pk.packing_kit.toString() === packingKitId));

    if(check.length !== 0){
        check.forEach(_ => {
            error = true;
        });
    }

    return { error };
}