import InternalPassport from "./InternalPassport";
import ForeignPassport from "./ForeignPassport";
import TaxpayerCard from "./TaxpayerCard";
import ReferenceInternallyDisplacedPerson from "./ReferenceInternallyDisplacedPerson";
import BirthCertificate from "./BirthCertificate";

interface Data {
    "internal-passport": InternalPassport;
    "foreign-passport": ForeignPassport;
    "taxpayer-card": TaxpayerCard;
    "reference-internally-displaced-person": ReferenceInternallyDisplacedPerson;
    "birth-certificate": BirthCertificate;
}

export default class Metadata {
    private requestId: string;
    private documentTypes: string[];
    private data: Data;
}