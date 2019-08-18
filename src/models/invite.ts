export default class Invite
{
    constructor(
        public inviteId: string,
        public roleId: string,
        public uses: number,
    ) { }
}