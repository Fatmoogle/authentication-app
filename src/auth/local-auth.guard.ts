import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // local tells passport what strategy we are going to use
    // this allows multiple multiple strategies to be used at once
    // this triggers our local strategy
}

// The auth guard will trigger the strategy to run.
// From here, go to local.strategy.ts