<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FruitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'size'  => $this->size,
            'size_name'  => $this->size_name,
            'color' => $this->color,
        ];
    }
}
