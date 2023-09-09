package com.example.backend.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqLogin {

    private String phone;

    private String password;

    private boolean remember_me;

}
