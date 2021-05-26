export const encoder = (dbType: DbTypes) => {
            return `{
            "id": "${dbType.id}",
            "name": "${dbType.name}",
            "experience": "${dbType.experience}",
            "age": "${dbType.age}",
            "position": "${dbType.position}",
            "reportsTo": "${dbType.reportsTo}",
        }`;
};

export const decoder = async (jsonString: string, dbType: string): Promise<Employee> => {
    if(dbType === "Employee") {

        const parsedJson = await JSON.parse(jsonString);

        const keyList = ["id","name","experience","age","position", "reportsTo"];

        if(Object.keys(parsedJson).length === 0) {
            await Promise.reject(new Error(`Decoding error occured ${parsedJson}`   ));
        }

        const errorKeys = keyList.filter(item => !(item in parsedJson));

        if(errorKeys.length > 0) {
            await Promise.reject(new Error(`Decoding error occured ${errorKeys}`));
        }

        return {
            id: parsedJson.id,
            name: parsedJson.name,
            experience: parsedJson.experience,
            age: parsedJson.age,
            position: parsedJson.position,
            reportsTo: parsedJson.reportsTo,
        };
    }
};