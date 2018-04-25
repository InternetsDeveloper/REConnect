<?php
set_time_limit(1200);

use Webpatser\Countries\Countries;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder {

    protected $faker = null;

    protected $default_admin_user = null;

    protected $admin_users = [];

    protected $genders = [
        'men' => 'male',
        'women' => 'female',
        'none' => 'not_indicated'
    ];

    protected $min_campaigns = 1;
    protected $max_campaigns = 4;

    protected $min_roles = 1;
    protected $max_roles = 2;

    protected $min_phone_numbers = 1;
    protected $max_phone_numbers = 3;

    protected $min_addresses = 1;
    protected $max_addresses = 2;

    protected $min_tasks = 4;
    protected $max_tasks = 25;

    protected $states = [];

    protected $numAutoUsers = 50;

    protected $users_config = null;
    protected $roles_config = null;
    protected $department_config = null;
    protected $market_config = null;
    protected $languages_config = null;
    protected $compensation_plans_config = null;
    protected $area_of_speciality_config = null;
    protected $user_company_config = null;
    protected $lead_status_config = null;
    protected $prospect_status_config = null;
    protected $brokerage_config = null;
    protected $campaigns_config = null;
    protected $source_config = null;

    protected $cached = [
        'markets',
        'languages',
        'sources',
        'prospect_statuses',
        'lead_statuses',
        'departments',
        'brokerages',
        'area_of_specialities',
        'rolegroups',
        'roles',
        'compensation_plans',
        'brokerages'
    ];

    protected $user_mapping = [
        'name',
        'email',
        'age',
        'gender',
        'password',
        'photo_url',
        'email_subscribed',
        'insurance_expiration',
        'license_expiration',
        'start_date',
    ];

    protected $department_mapping = [
        'system_name'
    ];

    protected $user_role_mapping = [
        'name'
    ];

    protected $market_mapping = [
        'system_name'
    ];

    protected $phonenumber_mapping = [
        'phone_number',
        'is_cell',
        'is_business',
        'is_home',
        'is_preferred'
    ];

    protected $address_mapping = [
        'street',
        'city',
        'state',
        'post_code',
        'country_id',
        'is_mailing',
        'is_property',
        'is_business'
    ];

    protected $compensation_plan_mapping = [
        'system_name'
    ];

    protected $area_of_speciality_mapping = [
        'system_name'
    ];

    protected $user_company_mapping = [
        'system_name'
    ];

    protected $lead_mapping = [
        'email'
    ];

    protected $lead_status_mapping = [
        'system_name'
    ];

    protected $prospect_status_mapping = [
        'system_name'
    ];

    protected $rep_mapping = [
        'email'
    ];

    protected $source_mapping = [
        'system_name'
    ];

    protected $campaign_mapping = [
        'name'
    ];

    protected $brokerage_mapping = [
        'system_name'
    ];

    protected $language_mapping = [
        'system_name'
    ];

    protected $task_mapping = [
        'name',
        'description',
        'due_date'
    ];

    protected $note_mapping = [
        'note',
    ];

    public function run() {

        $this->faker = Faker\Factory::create();

        $this->numAutoUsers = config('users.seeder_config.num_user_seeds', $this->numAutoUsers);

        $this->min_campaigns = config('users.seeder_config.min_campaigns', $this->min_campaigns);
        $this->max_campaigns = config('users.seeder_config.max_campaigns', $this->max_campaigns);

        $this->min_roles = config('users.seeder_config.min_roles', $this->min_roles);
        $this->max_roles = config('users.seeder_config.max_roles', $this->max_roles);

        $this->min_phone_numbers  = config('users.seeder_config.min_phone_numbers', $this->min_phone_numbers);
        $this->max_phone_numbers = config('users.seeder_config.max_phone_numbers', $this->max_phone_numbers);

        $this->min_addresses = config('users.seeder_config.min_addresses', $this->min_addresses);
        $this->max_addresses = config('users.seeder_config.max_addresses', $this->max_addresses);

        $this->states = CountryState::getStates('US');

        $this->users_config = config('users.users');
        $this->roles_config = config('roles.roles');
        $this->department_config = config('departments.departments');
        $this->market_config = config('markets.markets');
        $this->languages_config = config('languages.languages');
        $this->compensation_plans_config = config('compensation-plans.compensation_plans');
        $this->area_of_speciality_config = config('area-of-speciality.area_of_specialities');
        $this->user_company_config = config('user-companies.user_companies');
        $this->lead_status_config = config('lead-status.lead_statuses');
        $this->prospect_status_config = config('prospect-status.prospect_statuses');
        $this->brokerage_config = config('brokerages.brokerages');
        $this->campaigns_config = config('campaigns.campaigns');
        $this->source_config = config('sources.sources');

        $this->seed();
    }

    public function seed() {

        $config = config('users');
        $this->default_admin_user = User::where('email', $config['defaults']['initial_user']['user']['email'])->first();

        $time_start = microtime(true);

        $this->fetchCache();

        foreach ($this->users_config as $user_data) {
            $user_data['tasks'] = $this->getRandomTasks();
            $admin_user = $this->create($user_data, true);
            $this->admin_users[] = $admin_user;
        }

        // create a set of contacts for each of us (the dev team)
        // for use in testing
        for($z = 0; $z < count($this->admin_users); $z++) {
            for ($i = 0; $i < $this->numAutoUsers; $i++) {
                Auth::setUser($this->admin_users[$z]);
                $this->create($this->createRandomUserData());
            }
        }

        $this->seedRepsAndLeads();

        $this->command->info('TOTAL USER SEEDER EXECUTION TIME: ' . (microtime(true) - $time_start));
    }

    protected function fetchCache() {

        foreach($this->cached as $cache) {
            $this->cached[$cache] = Cache::get($cache);
        }
    }

    protected function createRandomUserData() {
        return [
            'user' => $this->getRandomUserData(),
            'department' => $this->getRandomDepartment(),
            'user_roles' => $this->getRandomUserRoles(),
            'market' => $this->getRandomMarket(),
            'phone_numbers' => $this->getRandomPhoneNumbers(),
            'addresses' => $this->getRandomAddresses(),
            'languages' => $this->getRandomLanguage(),
            'compensation_plan' => $this->getRandomCompensationPlan(),
            'area_of_speciality' => $this->getRandomAreaOfSpeciality(),
            'campaigns' => $this->getRandomCampaigns(),
            'user_company' => $this->getRandomUserCompany(),
            'brokerage' => $this->getRandomBrokerage(),
            'source' => $this->getRandomSource(),
            'tasks' => $this->getRandomTasks(),
            'notes' => $this->getRandomNotes(),
        ];
    }

    protected function getRandomUserData() {

        $gender = $this->faker->randomElement($this->genders);
        $gender_short = array_search($gender, $this->genders);
        $photo_url = '';
        if($gender_short != 'none')
            $photo_url = 'https://randomuser.me/api/portraits/'.$gender_short.'/'.$this->faker->numberBetween(0, 99).'.jpg';

        return [
            'name' => $this->faker->firstNameMale .' '. $this->faker->lastName,
            'email' => strtolower($this->faker->firstNameMale.$this->faker->lastName.$this->faker->numberBetween(1, 999999).'@example.com'),
            'age' => $this->faker->numberBetween(18, 70),
            'gender' => $gender,
            'password' => $this->faker->password(8, 20),
            'photo_url' => $photo_url,
            'email_subscribed' => $this->faker->boolean(),
            'insurance_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
            'license_expiration' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days')),
            'start_date' => $this->faker->date()
        ];
    }

    protected function getRandomUserRoles() {
        return collect($this->faker->randomElements($this->roles_config, rand($this->min_roles, $this->max_roles)))->pluck('role')->all();
    }

    protected function getRandomDepartment() {
        return $this->faker->randomElement($this->department_config);
    }

    protected function getRandomMarket() {
        return $this->faker->randomElement($this->market_config);
    }

    protected function getRandomPhoneNumbers() {

        $phone_numbers = [];
        $num_phone_numbers = rand($this->min_phone_numbers, $this->max_phone_numbers);
        for($i = 0; $i < $num_phone_numbers; $i++) {
            $type = $this->faker->randomElement(['is_cell', 'is_business', 'is_home']);
            $phone_numbers[] = [
                'phone_number' => $this->faker->numberBetween(1111111111, 9999999999),
                $type => 1
            ];
        }

        $phone_numbers[rand(0, count($phone_numbers) -1)]['is_preferred'] = 1;

        return $phone_numbers;
    }

    protected function getRandomAddresses() {

        $addresses = [];
        $num_addresses = rand($this->min_addresses, $this->max_addresses);
        for($i = 0; $i < $num_addresses; $i++) {
            $type = $this->faker->randomElement(['is_mailing', 'is_property', 'is_business']);
            $addresses[] = [
                'street' => $this->faker->streetName,
                'city' => $this->faker->city,
                'state' => $this->faker->randomElement($this->states),
                'post_code' => $this->faker->numberBetween(11111, 99999),
                'country_id' => Countries::where('full_name', 'United States of America')->first()->id,
                $type => 1
            ];
        }

        return $addresses;
    }

    protected function getRandomLanguage() {

        return array($this->faker->randomElement($this->languages_config));
    }

    protected function getRandomCompensationPlan() {

        return $this->faker->randomElement($this->compensation_plans_config);
    }

    protected function getRandomAreaOfSpeciality() {

        return $this->faker->randomElement($this->area_of_speciality_config);
    }

    protected function getRandomCampaigns() {

        $campaigns = [];
        $num_campaigns = rand($this->min_campaigns, $this->max_campaigns);
        for($i = 0; $i < $num_campaigns; $i++) {
            $campaigns[] = [
                'name' => $this->faker->firstNameMale."'s".' Campaign: '.$this->faker->year,
                'description' => $this->faker->paragraph(4)
            ];
        }

        return $campaigns;
    }

    protected function getRandomUserCompany() {

        return $this->faker->randomElement($this->user_company_config);
    }

    protected function getRandomBrokerage() {

        return $this->faker->randomElement($this->brokerage_config);
    }

    protected function getRandomSource() {

        return $this->faker->randomElement($this->source_config);
    }

    protected function getRandomLeadStatus() {

        return $this->faker->randomElement($this->lead_status_config);
    }

    protected function getRandomProspectStatus() {

        return $this->faker->randomElement($this->prospect_status_config);
    }

    protected function getRandomTasks() {

        $tasks = [];
        $num_tasks = rand($this->min_tasks, $this->max_tasks);
        for($i = 0; $i < $num_tasks; $i++) {
            $tasks[] = [
                'name' => $this->faker->sentence($nbWords = 4, $variableNbWords = true),
                'description' => $this->faker->paragraph(4),
                'due_date' => date('Y-m-d', strtotime( '+'.mt_rand(0,30).' days'))
            ];
        }

        return $tasks;
    }

    protected function getRandomNotes() {

        $note = [
            'note' => $this->faker->bs() . ' for ' . $this->faker->company() . ' ' . $this->faker->companySuffix()
        ];
        return $note;
    }

    protected function create($user_data, $use_admin_user = false) {

        $time_start = microtime(true);

        $user_row = $this->mapRow($user_data['user'], $this->user_mapping);

        if (!$user_row) {
            return FALSE;
        }

        if($use_admin_user) {
            Auth::setUser($this->default_admin_user);
        }

        $user = $this->createOrUpdateUser($user_row);

        if (!get_class($user) == 'App\User') {
            return FALSE;
        }

        Auth::setUser($user);

        if(!empty($user_data['user_roles'])) {
            foreach ($user_data['user_roles'] as $user_role) {
                $user_role_row = $this->mapRow($user_role, $this->user_role_mapping);
                $this->associateUserRole($user_role_row, $user);
            }
        }

        if(!empty($user_data['department'])) {
            $department_row = $this->mapRow($user_data['department'], $this->department_mapping);
            $this->associateDepartment($department_row, $user);
        }

        if(!empty($user_data['notes'])) {
            $note_row = $this->mapRow($user_data['notes'], $this->note_mapping);
            $this->associateNote($note_row, $user);
        }

        if(!empty($user_data['market'])) {
            $market_row = $this->mapRow($user_data['market'], $this->market_mapping);
            $this->associateMarket($market_row, $user);
        }

        if(!empty($user_data['phone_numbers'])) {
            foreach ($user_data['phone_numbers'] as $phone_number_row) {
                $phonenumber_row = $this->mapRow($phone_number_row, $this->phonenumber_mapping);
                $this->associatePhoneNumber($phonenumber_row, $user);
            }
        }

        if(!empty($user_data['addresses'])) {
            foreach ($user_data['addresses'] as $address_row) {
                $address_row = $this->mapRow($address_row, $this->address_mapping);
                $this->associateAddresses($address_row, $user);
            }
        }

        if(!empty($user_data['languages'])) {
            foreach ($user_data['languages'] as $language_row) {
                $language_row = $this->mapRow($language_row, $this->language_mapping);
                $this->associateLanguage($language_row, $user);
            }
        }

        if(!empty($user_data['compensation_plan'])) {
            $compensation_plan_row = $this->mapRow($user_data['compensation_plan'], $this->compensation_plan_mapping);
            $this->associateCompensationPlan($compensation_plan_row, $user);
        }

        if(!empty($user_data['area_of_speciality'])) {
            $area_of_speciality_row = $this->mapRow($user_data['area_of_speciality'], $this->area_of_speciality_mapping);
            $this->associateAreaOfSpeciality($area_of_speciality_row, $user);
        }

        if(!empty($user_data['user_company'])) {
            $user_company_row = $this->mapRow($user_data['user_company'], $this->user_company_mapping);
            $this->associateUserCompany($user_company_row, $user);
        }

        if(!empty($user_data['brokerage'])) {
            $brokerage_row = $this->mapRow($user_data['brokerage'], $this->brokerage_mapping);
            $this->associateBrokerage($brokerage_row, $user);
        }

        if(!empty($user_data['campaigns'])) {
            foreach ($user_data['campaigns'] as $campaign_row) {
                $campaign_row = $this->mapRow($campaign_row, $this->campaign_mapping);
                $this->associateCampaign($campaign_row, $user);
            }
        }

        if(!empty($user_data['source'])) {
            if (!empty($user_data['source'])) {
                $source_row = $this->mapRow($user_data['source'], $this->source_mapping);
                $this->associateSource($source_row, $user);
            }
        }

        if(!empty($user_data['tasks'])) {
            foreach ($user_data['tasks'] as $task_row) {
                $task_row = $this->mapRow($task_row, $this->task_mapping);
                $this->associateTask($task_row, $user);
            }
        }

        $this->command->info('Seeded: '.$user->email);
        $this->command->info('User Create Execution Time in Seconds: ' . (microtime(true) - $time_start));

        return $user;
    }

    public function mapRow(array $row, array $mapping) {
        $row_values = [];

        foreach ($mapping as $column) {
            if (isset($row[$column]) && $row[$column] !== '') {
                if ($column == 'password') {
                    $row_values[$column] = Hash::make($row[$column]);
                }
                else {
                    $row_values[$column] = $row[$column];
                }
            }
        }

        return $row_values;
    }

    protected function createOrUpdateUser($user_row) {

        $user = User::updateOrCreate(['email' => $user_row['email']], $user_row);

        return $user;
    }

    protected function associateUserRole($user_role_data, $user) {
        $role = $this->cached['roles']->where('name', $user_role_data['name']);
        if(!empty($role)) {
            $user->assignRole($role->first());
            $user->save();
        }
    }

    protected function associateDepartment($department_data, $user) {
        $department = $this->cached['departments']->where('system_name', $department_data['system_name']);
        if(!empty($department)) {
            $user->addDepartment($department->first());
            $user->save();
        }
    }

    protected function associateMarket($market_data, $user) {
        $market = $this->cached['markets']->where('system_name', $market_data['system_name']);
        if(!empty($market)) {
            $user->addMarket($market->first());
            $user->save();
        }
    }

    protected function associatePhoneNumber($phonenumber_data, $user) {
        $user->addPhoneNumber($phonenumber_data);
        $user->save();
    }

    protected function associateNote($note_data, $user) {
        $user->addNote($note_data);
        $user->save();
    }

    protected function associateAddresses($address_data, $user) {
        $user->addAddress($address_data);
        $user->save();
    }

    protected function associateCompensationPlan($compensation_plan_data, $user) {
        $compensation_plan = $this->cached['compensation_plans']->where('system_name', $compensation_plan_data['system_name']);
        if(!empty($compensation_plan)) {
            $user->addCompensationPlan($compensation_plan->first());
            $user->save();
        }
    }

    protected function associateAreaOfSpeciality($area_of_speciality_data, $user) {
        $area_of_speciality = $this->cached['area_of_specialities']->where('system_name', $area_of_speciality_data['system_name']);
        if(!empty($area_of_speciality)) {
            $user->addAreaOfSpeciality($area_of_speciality->first());
            $user->save();
        }
    }

    protected function associateUserCompany($user_company_data, $user) {
        $user_company = UserCompany::where('system_name', $user_company_data)->first();
        if(!empty($user_company)) {
            $user->addCompany($user_company);
            $user->save();
        }
    }

    protected function associateLead($assign_to, $assign_from) {
        $assign_from->assignLead($assign_to);
        $assign_from->save();
    }

    protected function associateLeadStatus($lead_status_data, $user) {
        $leadStatus = $this->cached['lead_statuses']->where('system_name', $lead_status_data['system_name']);
        if(!empty($leadStatus)) {
            $user->assignLeadStatus($leadStatus->first());
            $user->save();
        }
    }

    protected function associateProspectStatus($prospect_status_data, $user) {
        $prospectStatus = $this->cached['prospect_statuses']->where('system_name', $prospect_status_data['system_name']);
        if(!empty($prospectStatus)) {
            $user->assignProspectStatus($prospectStatus->first());
            $user->save();
        }
    }

    protected function associateRep($assign_to, $assign_from) {
        $assign_from->assignRep($assign_to);
        $assign_from->save();
    }

    protected function associateSource($source_data, $user) {
        $source = $this->cached['sources']->where('system_name', $source_data['system_name']);
        if(!empty($source)) {
            try {
                $user->addSource($source->first());
                $user->save();
            } catch (Exception $e) {
                return TRUE;
            }
        }
    }

    protected function associateBrokerage($brokerage_data, $user) {
        $brokerage = $this->cached['brokerages']->where('system_name', $brokerage_data['system_name']);
        if(!empty($brokerage)) {
            $user->addBrokerage($brokerage->first());
            $user->save();
        }
    }

    protected function associateCampaign($campaign_data, $user) {
        $user->addCampaign(['name' => $campaign_data['name']], $campaign_data);
        $user->save();
    }

    protected function associateTask($task_data, $user) {
        $user->addTask(['name' => $task_data['name'], 'description' => $task_data['description'], 'due_date' => $task_data['due_date']], $task_data);
        $user->save();
    }

    protected function associateLanguage($language_data, $user) {
        $language = $this->cached['languages']->where('system_name', $language_data['system_name']);
        if(!empty($language)) {
            $user->addLanguage($language->first());
            $user->save();
        }
    }

    protected function seedRepsAndLeads() {

        $rob = \App\Models\Users\User::where('email', 'rpowers@worthclark.com')->get()->first();
        $adam = \App\Models\Users\User::where('email', 'avera@worthclark.com')->get()->first();
        $josh = \App\Models\Users\User::where('email', 'josh@worthclark.com')->get()->first();
        $alissa = \App\Models\Users\User::where('email', 'alissat@worthclark.com')->get()->first();
        $bryan = \App\Models\Users\User::where('email', 'bryan@worthclark.com')->get()->first();

        $admins = [$rob, $adam, $josh, $alissa, $bryan];

        $users = \App\Models\Users\User::where('email', '<>', 'rpowers@worthclark.com')
            ->where('email', '<>', 'avera@worthclark.com')
            ->where('email', '<>', 'josh@worthclark.com')
            ->where('email', '<>', 'alissat@worthclark.com')
            ->where('email', '<>', 'bryan@worthclark.com')
            ->get();

        $time_start = microtime(true);
        $users = $users->shuffle();
        $chunk_size = floor(count($users) / count($admins));
        $chunks = $users->chunk($chunk_size);
        for($i = 0; $i < count($admins); $i++) {

            $this->command->info('Associating Leads and Reps: '.$admins[$i]->email);

            $admin = $admins[$i];

            Auth::setUser($admin);

            $chunks[$i]->each(function ($user) use ($admin) {

                if($user && \App\Models\Users\User::isInRoleGroup($user, \App\Models\Users\User::$non_staff_role_groups)) {
                    $this->associateLead($admin, $user);
                    $this->associateLeadStatus($this->getRandomLeadStatus(), $user);
                    $this->associateProspectStatus($this->getRandomProspectStatus(), $user);
                    $this->associateRep($admin, $user);
                }
            });

            $this->command->info('Finished associating Leads and Reps '.$admins[$i]->email.' Execution Time in Seconds: ' . (microtime(true) - $time_start));
        }
    }
}