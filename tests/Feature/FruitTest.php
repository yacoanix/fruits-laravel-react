<?php

namespace Tests\Feature;

use App\Models\Fruit;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FruitTest extends TestCase
{
    protected $faker;

    public function test_can_update_fruit() {

        $fruit = Fruit::factory()->create();

        $faker = Factory::create();

        $data = [
            'name'  => $faker->name,
            'size'  => $faker->numberBetween(0,2),
            'color' => $faker->name,
        ];

        $this->put(route('fruits.update', $fruit->id), $data)
            ->assertStatus(200);

        $this->get(route('fruits.show', $fruit->id))
            ->assertStatus(200)
            ->assertJson(
               [
                   'data' => [
                    'id'    => $fruit->id,
                    'name'  => $data['name'],
                    'size'  => $data['size'],
                    'size_name'  => $this->getSizeName($data['size']),
                    'color' => $data['color'],
                ]]
            );
    }

    private function getSizeName($id){
        switch ($id){
            case 0:
                return 'pequeño';
                break;
            case 1:
                return 'mediano';
                break;
            case 2:
                return 'grande';
                break;
            default:
                return 'error';
                break;
        }
    }
}
