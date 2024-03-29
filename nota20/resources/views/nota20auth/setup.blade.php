@extends('nota20auth.index')

@section('content')
<div class="container main">
    
    <div class="main-center">
    
    <h1>Nota20</h1>
    <p>Sistema de Gestão Academica</p>
    </div>
    <div class="main-formgroup"> 
    <form method="POST" action="{{route('register') }}">
    @csrf
    
    <label for="userName"><h4 class="my-ultra-weight">Registro de Usuário</h4></label>
    
    <div class="form-row"> 
      <div class="form-group col-md-4">
          <label for="surname">Apelido</label>
          <input type="text" name="surname" class="form-control main-input @error('surname') is-invalid @enderror" id="surname" value="{{ old('surname') }}" required autocomplete="">
          @error('surname')
            <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
            </span>
          @enderror
        </div>
    
      <div class="form-group col-md-8">
          <label for="userName">Nome</label>
          <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" aria-describedby="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
        
          @error('name')
            <span class="invalid-feedback" role="alert">
              <strong>{{ $message }}</strong>
              </span>
            @enderror
        </div>
    </div>

    <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" id="email" value="{{ old('email') }}" required autocomplete="email" aria-describedby="email">
            @error('email')
              <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
              </span>
            @enderror
        </div>
        <div class="form-group col-md-6">
          <label for="user_id">Documento de Identificação</label>
          <input type="text" name="user_id" class="form-control main-input @error('user_id') is-invalid @enderror" id="user_id" value="{{ old('user_id') }}" required autocomplete="">
          @error('user_id')
            <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
            </span>
          @enderror
        </div>
      </div>   

      <div class="form-row">
      
          <div class="form-group col-md-6">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" name="password" class="form-control main-input @error('password') is-invalid @enderror" id="password" required autocomplete="new-password">
            @error('password')
              <span class="invalid-feedback" role="alert">
              <strong>{{ $message }}</strong>
              </span>
            @enderror
          </div>

          <div class="form-group col-md-6">
            <label for="password_confirmation">Confirmação de Password</label>
            <input type="password" name="password_confirmation" class="form-control main-input" id="password-confirm" name="password_confirmation" required autocomplete="new-password">
          </div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
    </div>
    @endsection