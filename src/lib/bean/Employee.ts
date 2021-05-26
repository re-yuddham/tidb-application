class Employee {
    id: number;
	name: string;
	experience: number;
	age: number;
	position: string;
	reportsTo: number;


    encode() {
        return `{
            "id": "${this.id}",
            "name": "${this.name}",
            "experience": "${this.experience}",
            "age": "${this.age}",
            "position": "${this.position}",
            "reportsTo": "${this.reportsTo}",
        }`;
    }
}