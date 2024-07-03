import {Model,Mongoose} from 'mongoose';
import {ISalle,salleSchema} from "./salle.model";
import {IUser, userSchema} from "./user.model";
import {ISession, sessionSchema} from "./session.model";
import {IExerciseType, exerciseTypeSchema} from "./exerciseType.model";
import {IBadge, badgeSchema} from "./badge.model";
import {IUserBadge, userBadgeSchema} from "./userBadge.model";
import {IChallenge, challengeSchema} from "./challenge.model";
import {IUserChallenge, userChallengeSchema} from "./userChallenge.model";
import {exerciseChallengeSchema, IExerciseChallenge} from "./exerciseChallenge.model";


export class ModelRegistry{
    readonly mongoose : Mongoose;
    readonly userModel : Model<IUser>;
    readonly salleModel : Model<ISalle>;
    readonly sessionModel : Model<ISession>;
    readonly exerciseTypeModel : Model<IExerciseType>;
    readonly badgeModel : Model<IBadge>;
    readonly userBadgeModel : Model<IUserBadge>;
    readonly challengeModel : Model<IChallenge>;
    readonly userChallengeModel : Model<IUserChallenge>;
    readonly exerciseChallengeModel : Model<IExerciseChallenge>;

    constructor(mongoose:Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User',userSchema);
        this.salleModel = mongoose.model('Salle',salleSchema);
        this.sessionModel = mongoose.model('Session',sessionSchema);
        this.exerciseTypeModel = mongoose.model('ExerciseType',exerciseTypeSchema);
        this.badgeModel = mongoose.model('Badge',badgeSchema);
        this.userBadgeModel = mongoose.model('UserBadge', userBadgeSchema);
        this.challengeModel = mongoose.model('Challenge', challengeSchema);
        this.userChallengeModel = mongoose.model('UserChallenge', userChallengeSchema);
        this.exerciseChallengeModel = mongoose.model("ExerciseChallenge",exerciseChallengeSchema);
    }
}