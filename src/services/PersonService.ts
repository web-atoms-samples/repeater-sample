import DISingleton from "@web-atoms/core/dist/di/DISingleton";

export interface IPerson {
    name: string;
    images: string[];
}

const person = (name, index): IPerson => ({
    name,
    images: [
        `/images/i${index}-1.jpg`,
        `/images/i${index}-2.jpg`,
        `/images/i${index}-3.jpg`,
        `/images/i${index}-4.jpg`,
        `/images/i${index}-5.jpg`,
    ]
});


@DISingleton()
export default class PersonService {

    public async loadPeople() {
        return [
            person("Alice", 1),
            person("Jessica", 2),
            person("Lucy", 3),
        ];
    }

}