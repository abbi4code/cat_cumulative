import mongoose from "mongoose";

interface clgprops {
    clgname: string,
    matriculation: number,
    plustwo: number,
    graduation: number,
    VARC: number,
    DILR: number,
    QA: number,
    overall: number,
   compositescore: number,
   VARC_percentile: mongoose.Types.Decimal128,
   DILR_percentile: mongoose.Types.Decimal128,
   QA_percentile: mongoose.Types.Decimal128,
   overall_percentile: mongoose.Types.Decimal128

}


const CollegeSchema = new mongoose.Schema<clgprops>({
    clgname:{
        type: String,
        required: true,
        unique: true
    },
    matriculation:{
        type: Number,
        required: true,
        integer: true,
        get: (v:number) => Math.round(v),
        set: (v:number) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]
    },
    plustwo:{
        type: Number,
        required: true,
        integer: true,
        get: (v:number) => Math.round(v),
        set: (v:number) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]
    },
    graduation:{
        type: Number,
        required: true,
        integer: true,
        get: (v:number) => Math.round(v),
        set: (v:number) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]

    },
    VARC:{
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [72, "Invalid Input"]
    },
    QA:{
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [66, "Invalid Input"]
    },
    DILR:{
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [60, "Invalid Input"]
    },
    VARC_percentile: {
        type: mongoose.Schema.Types.Decimal128,
        default: mongoose.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value: mongoose.Types.Decimal128) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    QA_percentile: {
        type: mongoose.Schema.Types.Decimal128,
        default: mongoose.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value: mongoose.Types.Decimal128) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    DILR_percentile: {
        type: mongoose.Schema.Types.Decimal128,
        default: mongoose.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value: mongoose.Types.Decimal128) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    overall_percentile: {
        type: mongoose.Schema.Types.Decimal128,
        default: mongoose.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value: mongoose.Types.Decimal128) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    overall:{
        type: Number,
        default: 0,
        max:[198, "Invalid input"]
    },
    compositescore:{
        type: Number,
        max: [100, "Invalid input"]
    }


    

})

const Clgscore = mongoose.model("Clgscore", CollegeSchema)
export default Clgscore