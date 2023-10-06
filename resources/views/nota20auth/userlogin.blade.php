@extends('nota20auth.index')

@section('content')
<div class="container main">
    
 
    <div class="main-center">
    
    <h1>Nota20</h1>
    <p>Sistema de Gestão Academica</p>
    </div>
    <div class="main-formgroup"> 
    <form method="POST" action="{{route('login')}}">
    @csrf
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" id="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{old('email')}}" required autocomplete="email" autofocus>
        @error('email')
          <span class="invalid-feedback" role="alert">
            <strong>Email ou password inválido</strong>
          </span>
        @enderror
      
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" id="password" class="form-control main-input @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
        @error('password')
          <span class="invalid-feedback" role="alert">
            <strong>Email ou password inválido</strong>
          </span>
        @enderror
      </div>
      <!---REMEMBER ME BUTTOM DEACTIVATED
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
        <label class="form-check-label" for="exampleCheck1">Continuar autenticado </label>
      </div>
      ------->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
    @endsection
  