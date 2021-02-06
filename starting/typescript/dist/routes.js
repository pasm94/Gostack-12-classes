"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
// string, number, boolean, object, Array
// interfaces
function helloWorld(request, response) {
    var user = CreateUser_1.default({
        email: 'paulo@teste.com',
        password: '123456',
        techs: ['NodeJS', 'ReactJS', 'React Native', { title: 'JavaScript', experience: 100 }]
    });
    console.log(user.email, user.techs);
    return response.json({ message: 'Hello World XD' });
}
exports.helloWorld = helloWorld;
