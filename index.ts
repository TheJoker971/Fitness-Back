import {config} from "dotenv";
config(); // chargement des vars d'env

import {MongooseUtils} from "./utils";
import {Mongoose} from "mongoose";
import express from "express";
import cors from "cors";
import {ModelRegistry} from "./models";
import {
    AuthController, BadgeController,
    ChallengeController,
    ExerciseChallengeController, ExerciseTypeController, SalleController,
    UserBadgeController,
    UserChallengeController, UserController
} from "./controllers";
import {
    AuthService, BadgeService,
    ChallengeService,
    ExerciseChallengeService, ExerciseTypeService, SalleService,
    UserBadgeService,
    UserChallengeService,
    UserService
} from "./services";

async function launchAPI() {
    const db : Mongoose = await MongooseUtils.open();
    const registry = new ModelRegistry(db);
    const app = express();
    const salleService = new SalleService(registry);
    const exerciseTypeService = new ExerciseTypeService(registry);
    const badgeService = new BadgeService(registry);
    const userBadgeService = new UserBadgeService(registry);
    const authService = new AuthService(registry);
    const challengeService = new ChallengeService(registry);
    const userChallengeService = new UserChallengeService(registry);
    const userService = new UserService(registry);
    const exerciseChallengeService  = new ExerciseChallengeService(registry);

    const userController = new UserController(authService,userService);
    const salleController = new SalleController(salleService,authService);
    const authController = new AuthController(authService);
    const exerciseTypeController = new ExerciseTypeController(exerciseTypeService);
    const badgeController = new BadgeController(badgeService);
    const userBadgeController = new UserBadgeController(userBadgeService);
    const challengeController = new ChallengeController(challengeService);
    const userChallengeController = new UserChallengeController(userChallengeService);
    const exerciseChallengeController = new ExerciseChallengeController(registry,exerciseChallengeService);

    app.use(cors());

    app.use(express.json());


    app.use('/userBadge', userBadgeController.buildRoutes());
    app.use('/badge', badgeController.buildRoutes());
    app.use('/exerciseType',exerciseTypeController.buildRoutes());
    app.use('/salle',salleController.buildRoutes());
    app.use('/auth',authController.buildRoutes());
    app.use('/challenge',challengeController.buildRoutes());
    app.use('/userChallenges', userChallengeController.buildRoutes());
    app.use('/user',userController.buildRoutes());

    app.listen(process.env.PORT,function(){
        console.log(`Listening on port ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);