import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      const userCreated = user.toObject();

      delete userCreated.password;

      return { ...userCreated };
    } catch (error) {
      console.log(error);
      return this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel
      .findOne({ email })
      .select('email password _id');

    if (!user) throw new UnauthorizedException('Credentials are not valid');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const userLogged = user.toObject();

    return {
      ...userLogged,
      token: this.getJwtToken({ _id: userLogged._id.toString() }),
    };
  }

  async chechAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ _id: user._id.toString() }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async activateClouster() {
    try {
      await this.userModel.findOne({});
      return 'Clouster activated';
    } catch (error) {
      throw new InternalServerErrorException('Error to activate clouster');
    }
  }

  private handleExceptions(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create user - Check server log`,
    );
  }
}
