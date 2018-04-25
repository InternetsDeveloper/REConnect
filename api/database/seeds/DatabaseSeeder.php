<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Starting Seeder...');

        $this->command->info('Dumping Redis...');
        Cache::flush();
        $this->command->info('Done Dumping Redis!');

        Model::unguard();

        $this->command->info('Starting the initial seeder...');
        $this->call(InitialSetupSeeder::class);
        $this->command->info('Seeded the initial setup!');

        $this->command->info('Logging in Admin User...');
        $config = config('users');
        $admin_user = User::where('email', $config['defaults']['initial_user']['user']['email'])->first();
        Auth::setUser($admin_user);
        $this->command->info('Admin User logged in!');

        $this->command->info('Starting the Role Groups seeder...');
        $this->call(RoleGroupsSeeder::class);
        $this->command->info('Seeded the Role groups!');

        $this->command->info('Starting the Roles seeder...');
        $this->call(RolesSeeder::class);
        $this->command->info('Seeded the Roles!');

        $this->command->info('Starting the Modules seeder...');
        $this->call(ModulesSeeder::class);
        $this->command->info('Seeded the Modules!');

        $this->command->info('Starting the Departments seeder...');
        $this->call(DepartmentsSeeder::class);
        $this->command->info('Seeded the Departments');

        //$this->call(PermissionsSeeder::class);
        //$this->command->info('Seeded the permissions!');

        $this->command->info('Starting the Countries seeder...');
        $this->call(CountriesSeeder::class);
        $this->command->info('Seeded the Countries!');

        $this->command->info('Starting the Markets seeder...');
        $this->call(MarketsSeeder::class);
        $this->command->info('Seeded the Markets!');

        $this->command->info('Starting the Compensation Plans seeder...');
        $this->call(CompensationPlansSeeder::class);
        $this->command->info('Seeded the Compensation Plans!');

        $this->command->info('Starting the Brokerages seeder...');
        $this->call(BrokeragesSeeder::class);
        $this->command->info('Seeded the Brokerages!');

        $this->command->info('Starting the Sources seeder...');
        $this->call(SourcesSeeder::class);
        $this->command->info('Seeded the Sources!');

        $this->command->info('Starting the User Companies seeder...');;
        $this->call(UserCompaniesSeeder::class);
        $this->command->info('Seeded the User Companies!');

        $this->command->info('Starting the Languages seeder...');
        $this->call(LanguagesSeeder::class);
        $this->command->info('Seeded the Languages!');


//        $this->call(CardsSeeder::class);
//        $this->command->info('Seeded the cards');

        // we should never have campaigns without users
//        $this->call(CampaignsSeeder::class);
//        $this->command->info('Seeded the campaigns!');

        $this->command->info('Starting the Prospect Statuses seeder...');
        $this->call(ProspectStatusSeeder::class);
        $this->command->info('Seeded the Prospect Statuses!');

        $this->command->info('Starting the Lead Statuses seeder...');
        $this->call(LeadStatusSeeder::class);
        $this->command->info('Seeded the Lead Statuses!');

        $this->command->info('Starting the Transaction Statuses seeder...');
        $this->call(TransactionStatusSeeder::class);
        $this->command->info('Seeded the Transaction Statuses!');

        $this->command->info('Starting the Areas of speciality seeder...');
        $this->call(AreaOfSpecialitySeeder::class);
        $this->command->info('Seeded the Areas of speciality!');

        $this->command->info('Starting the Users seeder...');
        $this->call(UsersSeeder::class);
        $this->command->info('Seeded the Users!');

        $this->command->info('Starting the Transactions seeder...');
        $this->call(TransactionsSeeder::class);
        $this->command->info('Seeded the Transactions!');

        $this->command->info('Starting the Search Users Filters seeder...');
        $this->call(SearchUserFiltersSeeder::class);
        $this->command->info('Seeded the Search Users Filters!');

        Model::reguard();

        $this->command->info('Seeder Complete!');
    }
}
