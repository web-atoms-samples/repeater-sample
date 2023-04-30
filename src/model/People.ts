export interface IPerson {
    name: string;
    images: string[];
}

const model = (name, index): IPerson => ({
    name,
    images: [
        `/images/i${index}-1.jpg`,
        `/images/i${index}-2.jpg`,
        `/images/i${index}-3.jpg`,
        `/images/i${index}-4.jpg`,
        `/images/i${index}-5.jpg`,
    ]
});


export default class People {

    public static females = [
        model("Alice", 1),
        model("Jessica", 2),
        model("Lucy", 3),
    ];

}