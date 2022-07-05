import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, isString, IsString } from "class-validator";

const option: SchemaOptions = {
    id: false,
    collection: 'sockets',    // DB collection 명 설정(설정 안하면 class명 소문자, +s로 자동 설정)
    timestamps: true, //updateAt, createAt 자동으로 찍어줌
};

@Schema(option)
export class Socket extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    username: string;

}

export const SocketSchema = SchemaFactory.createForClass(Socket);