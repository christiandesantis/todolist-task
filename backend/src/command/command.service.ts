import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

@Injectable()
export class CommandService {
  @Command({
    command: 'command:test',
    describe: 'Test command to check if nestjs-command is working properly',
  })
  test(): void {
    console.log('Test command executed');
  }
}
