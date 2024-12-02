class Document {
    private series: string;
    private number: string;
    private department: string;
    private issueDate: string;
}

class Child {
    private lastName: string;
    private firstName: string;
    private middleName: string;
    private birthDate: string;
    private birthPlace: string;
    private currentRegistrationPlaceUA: string;
    private citizenship: string;
}

class Parent {
    private fullName: string;
    private citizenship: string;
}

class Parents {
    private father: Parent;
    private mother: Parent;
}

class Act {
    private name: string;
    private registrationPlace: string;
}

export default class BirthCertificate {
    private id: string;
    private document: Document;
    private child: Child;
    private parents: Parents;
    private act: Act;
}